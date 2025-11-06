import Image from 'next/image';
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DEFAULT_RESUME_JSON from '@/helpers/constants/resume-data.json';
import { useActivity } from '@/stores/activity';
import { useAwards } from '@/stores/awards';
import { useBasicDetails } from '@/stores/basic';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';
import { useEducations } from '@/stores/education';
import { useExperiences } from '@/stores/experience';
import { useTemplates } from '@/stores/useTemplate';
import { useVoluteeringStore } from '@/stores/volunteering';
import { useState, useRef, useCallback } from 'react';

export const TemplatesGrid = () => {
  const activeId = useTemplates((state) => state.activeTemplate.id);
  const setTemplate = useTemplates((state) => state.setTemplate);

  const entries = Object.values(AVAILABLE_TEMPLATES);
  const [pendingTemplateId, setPendingTemplateId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const applyDefaultResume = useCallback(() => {
    const d = DEFAULT_RESUME_JSON;
    useBasicDetails.getState().reset(d.basics);
    useLanguages.getState().reset(d.skills.languages);
    useFrameworks.getState().reset(d.skills.frameworks);
    useLibraries.getState().reset(d.skills.libraries);
    useDatabases.getState().reset(d.skills.databases);
    useTechnologies.getState().reset(d.skills.technologies);
    usePractices.getState().reset(d.skills.practices);
    useTools.getState().reset(d.skills.tools);
    useExperiences.getState().reset(d.work);
    useEducations.getState().reset(d.education);
    useVoluteeringStore.getState().reset(d.volunteer);
    useAwards.getState().reset(d.awards);
    useActivity.getState().reset(d.activities);
  }, []);

  const handleFileSelected = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsText(file);
      e.target.value = '';
      reader.onload = (ev) => {
        if (typeof ev.target?.result === 'string') {
          try {
            const uploaded = JSON.parse(ev.target.result);
            const {
              basics = {},
              skills = {},
              work = [],
              education = [],
              activities = { involvements: '', achievements: '' },
              volunteer = [],
              awards = [],
            } = uploaded;
            const {
              languages = [],
              frameworks = [],
              libraries = [],
              databases = [],
              technologies = [],
              practices = [],
              tools = [],
            } = skills;
            useBasicDetails.getState().reset(basics);
            useLanguages.getState().reset(languages);
            useFrameworks.getState().reset(frameworks);
            useLibraries.getState().reset(libraries);
            useDatabases.getState().reset(databases);
            useTechnologies.getState().reset(technologies);
            usePractices.getState().reset(practices);
            useTools.getState().reset(tools);
            useExperiences.getState().reset(work);
            useEducations.getState().reset(education);
            useVoluteeringStore.getState().reset(volunteer);
            useAwards.getState().reset(awards);
            useActivity.getState().reset(activities);
          } catch (err) {
            // ignore silently for now
          }
        }
        if (pendingTemplateId) {
          setTemplate(AVAILABLE_TEMPLATES[pendingTemplateId]);
        }
        setOpenDialog(false);
        setPendingTemplateId(null);
      };
    },
    [pendingTemplateId, setTemplate]
  );

  const chooseTemplate = (tplId: string) => {
    setPendingTemplateId(tplId);
    setOpenDialog(true);
  };

  return (
    <div className="mt-[18px] mb-[22px] md:px-[10px] grid grid-cols-1 gap-4">
      {entries.map((tpl) => {
        const isActive = tpl.id === activeId;
        return (
          <button
            type="button"
            key={tpl.id}
            className={`w-full flex items-center gap-4 rounded border p-3 text-left hover:shadow-level-4dp transition ${
              isActive ? 'border-resume-800 bg-resume-50' : 'border-resume-200'
            }`}
            onClick={() => chooseTemplate(tpl.id)}
          >
            <div className="relative h-[90px] w-[64px] shrink-0 overflow-hidden rounded border border-resume-200">
              <Image src={tpl.thumbnail} alt={tpl.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="flex-1">
              <div className="text-resume-800 font-medium">{tpl.name}</div>
              <div className="text-resume-600 text-sm">Click to select</div>
            </div>
            {isActive && (
              <Image src={'/icons/selected-tick.svg'} alt="selected" width={24} height={24} />
            )}
          </button>
        );
      })}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="text-resume-800">How would you like to start?</DialogTitle>
        <DialogContent>
          <p className="text-resume-600 mb-4">
            Choose an option to proceed with the selected template.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="application/json"
            onChange={handleFileSelected}
          />
        </DialogContent>
        <DialogActions className="px-6 pb-4 flex justify-between">
          <Button
            variant="outlined"
            onClick={() => {
              if (pendingTemplateId) {
                applyDefaultResume();
                setTemplate(AVAILABLE_TEMPLATES[pendingTemplateId]);
              }
              setOpenDialog(false);
              setPendingTemplateId(null);
            }}
          >
            Create new resume
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (fileInputRef.current) fileInputRef.current.click();
            }}
            className="bg-resume-800"
          >
            Edit with existing file
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
