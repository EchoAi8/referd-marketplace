import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, FileText, X, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ParsedResume {
  skills: string[];
  experienceYears: number;
  experienceLevel: string;
  currentTitle: string;
  currentCompany: string;
  education: string[];
  compensationExpectations: {
    minSalary: number;
    maxSalary: number;
    currency: string;
  };
  summary: string;
}

interface ResumeUploaderProps {
  onParsed: (data: ParsedResume) => void;
}

const ResumeUploader = ({ onParsed }: ResumeUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const handleFile = useCallback(async (selectedFile: File) => {
    const validTypes = ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    // For demo, we'll accept any text-based file
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 5MB.');
      return;
    }

    setFile(selectedFile);
    setParsing(true);
    setParsed(false);

    try {
      // For text files, extract directly
      // For PDFs/DOCs, we'd need additional parsing (simplified for demo)
      let resumeText = '';
      
      if (selectedFile.type === 'text/plain' || selectedFile.name.endsWith('.txt')) {
        resumeText = await extractTextFromFile(selectedFile);
      } else {
        // For other formats, we'll use the AI to work with what we can extract
        resumeText = await extractTextFromFile(selectedFile);
      }

      if (!resumeText.trim()) {
        toast.error('Could not extract text from file. Please try a .txt file or paste your resume.');
        setParsing(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('parse-resume', {
        body: { resumeText, fileName: selectedFile.name }
      });

      if (error) throw error;

      if (data?.success && data.data) {
        setParsed(true);
        onParsed(data.data);
        toast.success('Resume parsed successfully!');
      } else {
        throw new Error(data?.error || 'Failed to parse resume');
      }
    } catch (err) {
      console.error('Resume parse error:', err);
      toast.error('Failed to parse resume. Please try again.');
    } finally {
      setParsing(false);
    }
  }, [onParsed]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, [handleFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const clearFile = () => {
    setFile(null);
    setParsed(false);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
              ${dragOver 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50 hover:bg-muted/50'}
            `}
          >
            <input
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleInputChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Upload className={`w-10 h-10 mx-auto mb-3 transition-colors ${dragOver ? 'text-primary' : 'text-muted-foreground'}`} />
            <p className="font-medium">Drop your resume here</p>
            <p className="text-sm text-muted-foreground mt-1">or click to browse (.txt, .pdf, .doc)</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border border-border rounded-xl p-4 bg-muted/30"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                parsed ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'
              }`}>
                {parsing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : parsed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <FileText className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {parsing ? 'Analyzing with AI...' : parsed ? 'Parsed successfully' : 'Ready to analyze'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFile}
                className="shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeUploader;
