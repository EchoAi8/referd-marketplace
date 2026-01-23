import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Share2, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Link2, 
  Check,
  QrCode,
  X
} from "lucide-react";
import { toast } from "sonner";

interface SocialShareMenuProps {
  url?: string;
  title?: string;
}

const SocialShareMenu = ({ url, title }: SocialShareMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || "Check out Referd - Career Intelligence Platform";

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-[#0077B5]/10 hover:text-[#0077B5]",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-[#1877F2]/10 hover:text-[#1877F2]",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (socialUrl: string) => {
    window.open(socialUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  // QR Code using a free API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}&bgcolor=1A1A1A&color=8BA485`;

  return (
    <>
      {/* Floating Share Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-sage to-forest text-foreground shadow-lg shadow-sage/30 flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
        </motion.div>
      </motion.button>

      {/* Share Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 p-4 rounded-2xl bg-card/95 backdrop-blur-2xl border border-border/50 shadow-2xl min-w-[200px]"
          >
            <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
              Share
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2 mb-3">
              {socialLinks.map((social) => (
                <motion.button
                  key={social.name}
                  onClick={() => handleShare(social.url)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground transition-all ${social.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={`Share on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>

            {/* Copy Link */}
            <motion.button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors text-left"
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center">
                {copied ? (
                  <Check className="w-4 h-4 text-sage" />
                ) : (
                  <Link2 className="w-4 h-4 text-sage" />
                )}
              </div>
              <span className="text-sm font-medium">
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </motion.button>

            {/* QR Code Button */}
            <motion.button
              onClick={() => setShowQR(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors text-left mt-1"
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 rounded-lg bg-mustard/10 flex items-center justify-center">
                <QrCode className="w-4 h-4 text-mustard" />
              </div>
              <span className="text-sm font-medium">Show QR Code</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-card/95 backdrop-blur-2xl border border-border/50 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <h3 className="text-xl font-heading font-bold mb-2">Scan to Share</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Point your camera at the QR code
              </p>
              
              <div className="bg-foreground rounded-2xl p-4 inline-block mb-4">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-48 h-48 rounded-lg"
                />
              </div>
              
              <p className="text-xs text-muted-foreground font-mono break-all">
                {shareUrl}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SocialShareMenu;
