import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { TemplateSelect } from './nav-bar/components/TemplateSelect';
import { ThemeSelect } from './nav-bar/components/ThemeSelect';
import { useTemplates } from '@/stores/useTemplate';

export default function OnboardingChooser() {
  const [open, setOpen] = useState(true);
  const [showTheme, setShowTheme] = useState(false);
  const activeTemplateId = useTemplates((state) => state.activeTemplate.id);

  useEffect(() => {
    setOpen(true);
  }, []);

  // Auto-advance to theme selection when template is selected
  useEffect(() => {
    if (activeTemplateId && !showTheme) {
      const timer = setTimeout(() => {
        setShowTheme(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeTemplateId, showTheme]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle className="flex items-center justify-between">
        <span className="text-resume-800">Quick setup</span>
        <IconButton aria-label="close" onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="mt-2">
          {!showTheme ? (
            <TemplateSelect />
          ) : (
            <div>
              <h3 className="text-resume-800 font-medium mb-4">Choose a colour scheme</h3>
              <ThemeSelect />
              <div className="flex justify-end mt-4">
                <button
                  className="bg-resume-800 text-white px-4 py-2 rounded"
                  onClick={() => setOpen(false)}
                >
                  Start building
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
