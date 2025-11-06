import { AnimationGeneratorType, motion, useAnimation } from 'framer-motion';
import { NavBarActions, StyledButton } from '../builder/nav-bar/atoms';

import { BsGithub } from 'react-icons/bs';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FeatureSection from './components/Feature';
import Image from 'next/image';
import Link from 'next/link';
import Person from './components/Person';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import { useTemplates } from '@/stores/useTemplate';
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
import { useVoluteeringStore } from '@/stores/volunteering';

const HomeLayout = () => {
  const router = useRouter();
  const controls = useAnimation();
  const animationEffectsHoverEnter = { scale: 1.05 };
  const animationEffectsHoverLeave = { scale: 1 };
  const animationEffectsFirstLoad = {
    scale: [0.9, 1],
    opacity: [0, 1],
  };
  const transitionEffects = {
    type: 'spring' as AnimationGeneratorType,
    stiffness: 400,
    damping: 17,
  };
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showNewExistingDialog, setShowNewExistingDialog] = useState(false);
  const [pendingTemplateId, setPendingTemplateId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const setTemplate = useTemplates((state) => state.setTemplate);

  const applyDefaultResume = () => {
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
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          // ignore
        }
      }
      if (pendingTemplateId) {
        setTemplate(AVAILABLE_TEMPLATES[pendingTemplateId]);
      }
      setShowNewExistingDialog(false);
      setPendingTemplateId(null);
      router.push('/builder');
    };
  };

  const handleTemplateClick = (templateId: string) => {
    setPendingTemplateId(templateId);
    setShowTemplateDialog(false);
    setShowNewExistingDialog(true);
  };

  const handleCreateNew = () => {
    if (pendingTemplateId) {
      applyDefaultResume();
      setTemplate(AVAILABLE_TEMPLATES[pendingTemplateId]);
    }
    setShowNewExistingDialog(false);
    setPendingTemplateId(null);
    router.push('/builder');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} className="scroll-smooth">
      <nav className="sticky top-0 z-20 h-14 w-full bg-resume-800 flex py-2.5 px-4 xl:px-60 items-center shadow-level-8dp">
        <Link href="/">
          <Image src={'/icons/resume-icon.png'} alt="logo" height="36" width="36" />
        </Link>
        <div className="flex-auto flex justify-between items-center ml-5">
          <NavBarActions>
            <Link href="/builder" passHref={true}>
              <StyledButton variant="text">Editor</StyledButton>
            </Link>
            <Link href="/login" passHref={true}>
              <StyledButton variant="text">Login</StyledButton>
            </Link>
          </NavBarActions>
          <NavBarActions>
            <Link href="#contribute" passHref={true} className="max-md:hidden">
              <StyledButton variant="text">Contribute</StyledButton>
            </Link>
            <Link href="#about-us" passHref={true}>
              <StyledButton variant="text">About us</StyledButton>
            </Link>
            <a
              href={'https://github.com/gokulms1717/MSX'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub className="h-6 w-6" fill="white" />
            </a>
          </NavBarActions>
        </div>
      </nav>
      <div
        style={{
          background: 'linear-gradient(180deg, #E6FFFA 45%, #FFFFFF 100%)',
          fontFamily: "'Roboto Slab', serif",
        }}
      >
        <div className="mx-6 md:mx-40 xl:mx-60 mb-6">
          <motion.div
            className="grid grid-cols-12 pt-12 md:pt-24"
            initial={{ opacity: 0 }}
            animate={animationEffectsFirstLoad}
            transition={transitionEffects}
          >
            <div className="col-span-12 sm:col-span-4">
              <motion.img
                id="resume-3d"
                src="/resume.webp"
                alt="resume-3d"
                className="w-6/12 sm:w-9/12"
                onMouseEnter={() => {
                  controls.start(animationEffectsHoverEnter, transitionEffects);
                }}
                onMouseLeave={() => {
                  controls.start(animationEffectsHoverLeave, transitionEffects);
                }}
                animate={controls}
              />
            </div>
            <div className="col-span-12 sm:col-span-8">
              <h3 className="text-xl md:text-2xl mb-2 text-resume-400">
                Build job‑winning resumes in minutes
              </h3>
              <h1 className="text-5xl mb-6 text-resume-800">Create, Customize, and Download</h1>
              <p className="text-resume-600 mb-8 text-lg max-w-2xl">
                Choose from modern templates, tailor content effortlessly, and export your resume
                instantly.
              </p>

              <div className="flex mb-10">
                <div className="bg-resume-800 w-1 rounded-lg"></div>
                <p className="text-lg ml-3 text-resume-800">
                  &ldquo;The secret to getting ahead is getting started&rdquo;
                  <br />
                  —Mark Twain
                </p>
              </div>
              <Button
                variant="contained"
                className="bg-resume-800 mb-2"
                onClick={() => setShowTemplateDialog(true)}
              >
                BUILD YOUR RESUME
              </Button>
              <p
                className="xl:invisible text-resume-800"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Desktop screen recommended
              </p>
            </div>
          </motion.div>
          {/* Trust badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center opacity-80">
            <div className="text-center text-resume-600 text-sm">ATS‑friendly templates</div>
            <div className="text-center text-resume-600 text-sm">One‑click export (PDF)</div>
            <div className="text-center text-resume-600 text-sm">Live preview</div>
            <div className="text-center text-resume-600 text-sm">Free & open source</div>
          </div>
        </div>
      </div>

      <motion.div
        className="mx-6 md:mx-40 xl:mx-60 my-24"
        style={{ fontFamily: "'Roboto Slab', serif" }}
        initial={{ opacity: 0 }}
        animate={animationEffectsFirstLoad}
        transition={transitionEffects}
      >
        {/* 3 steps */}
        <h2 className="text-3xl text-resume-800 text-center mb-10">Get hired in 3 simple steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg shadow-level-4dp bg-white">
            <Image src={'/icons/palette.svg'} alt="choose" height={32} width={32} />
            <h3 className="text-xl text-resume-800 mt-3 mb-2">1. Choose a template</h3>
            <p className="text-resume-600">Pick a professional template to start quickly.</p>
          </div>
          <div className="p-6 rounded-lg shadow-level-4dp bg-white">
            <Image src={'/icons/edit.svg'} alt="customize" height={32} width={32} />
            <h3 className="text-xl text-resume-800 mt-3 mb-2">2. Customize content</h3>
            <p className="text-resume-600">
              Edit your details, reorder sections, and refine wording.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-level-4dp bg-white">
            <Image src={'/icons/download.svg'} alt="download" height={32} width={32} />
            <h3 className="text-xl text-resume-800 mt-3 mb-2">3. Download instantly</h3>
            <p className="text-resume-600">Export your resume and start applying.</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mx-6 md:mx-40 xl:mx-60 my-24"
        style={{ fontFamily: "'Roboto Slab', serif" }}
        initial={{ opacity: 0 }}
        animate={animationEffectsFirstLoad}
        transition={transitionEffects}
      >
        {/* Benefits grid */}
        <h2 className="text-3xl text-resume-800 text-center mb-10">
          Everything you need to stand out
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-[var(--color-custom-grey)] bg-white">
            <h3 className="text-lg text-resume-800 mb-2">Modern templates</h3>
            <p className="text-resume-600">Curated designs optimized for readability and ATS.</p>
          </div>
          <div className="p-6 rounded-lg border border-[var(--color-custom-grey)] bg-white">
            <h3 className="text-lg text-resume-800 mb-2">Drag & edit</h3>
            <p className="text-resume-600">
              Reorder sections, edit inline, and preview changes live.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-[var(--color-custom-grey)] bg-white">
            <h3 className="text-lg text-resume-800 mb-2">One‑click export</h3>
            <p className="text-resume-600">Download when ready—no account required.</p>
          </div>
          <div className="p-6 rounded-lg border border-[var(--color-custom-grey)] bg-white">
            <h3 className="text-lg text-resume-800 mb-2">Rich text support</h3>
            <p className="text-resume-600">Use bold, italics, links, and more where it matters.</p>
          </div>
          <div className="p-6 rounded-lg border border-[var(--color-custom-grey)] bg-white">
            <h3 className="text-lg text-resume-800 mb-2">Privacy first</h3>
            <p className="text-resume-600">Your data stays on your device unless you export it.</p>
          </div>
          <div className="p-6 rounded-lg border border-[var(--color-custom-grey)] bg-white">
            <h3 className="text-lg text-resume-800 mb-2">Free & open source</h3>
            <p className="text-resume-600">Built by the community, for the community.</p>
          </div>
        </div>
      </motion.div>

      {/* Footer CTA */}
      <div className="bg-resume-800">
        <div className="mx-6 md:mx-40 xl:mx-60 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-white text-2xl text-center md:text-left">
            Ready to build your resume?
          </h3>
          <Button
            variant="contained"
            className="bg-white text-resume-800"
            onClick={() => setShowTemplateDialog(true)}
          >
            Start for free
          </Button>
        </div>
      </div>

      <div className="bg-resume-50 my-32">
        <div
          id="contribute"
          className="mx-6 md:mx-40 xl:mx-60 py-12"
          style={{ fontFamily: "'Roboto Slab', serif" }}
        >
          <div className="grid grid-cols-12 items-center text-center">
            <div className="col-span-12 lg:col-span-4 mb-4 lg:mb-0 flex flex-col items-center gap-2">
              <Image src={'/icons/palette.svg'} alt="logo" height="48" width="48" />
              <p className="text-resume-800 text-xl mt-2">
                Do you want to make your own <strong>template?</strong>
              </p>
            </div>
            <div className="col-span-12 lg:col-span-1 mb-4 lg:mb-0 text-resume-800 text-4xl">
              <p>+</p>
            </div>
            <div className="col-span-12 lg:col-span-2 flex flex-col items-center gap-2">
              <Image src={'/icons/terminal.svg'} alt="logo" height="48" width="48" />
              <p className="text-resume-800 text-xl mt-2">
                Do you write <strong>React</strong> code?
              </p>
            </div>
            <div className="invisible lg:visible lg:col-span-2 text-resume-800 text-4xl mx-6">
              <p>=</p>
            </div>
            <div className="col-span-12 lg:col-span-3 mx-auto flex flex-col items-center gap-2">
              <div className="mb-6">
                <Image src={'/icons/wave.svg'} alt="logo" height="48" width="48" />
              </div>
              <div>
                <a
                  href="https://github.com/sadanandpai/resume-builder"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="contained" className="bg-resume-800 mt-2 lg:mt-5 mb-3">
                    CONTRIBUTE
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="about-us"
        className="mx-6 md:mx-40 xl:mx-60 my-32"
        style={{ fontFamily: "'Roboto Slab', serif" }}
      >
        <h2 className="text-resume-800 text-3xl mb-4 text-center lg:text-left">About us</h2>
        <p className="text-resume-800 text-xl mb-2 text-center lg:text-left">msx</p>
        <p className="text-resume-400 mb-8 text-center lg:text-left">All rights are reserved.</p>
        <blockquote className="text-resume-600 italic text-center lg:text-left">
          “The best way to predict the future is to create it.”
        </blockquote>
      </div>

      {/* Template Selection Dialog */}
      <Dialog
        open={showTemplateDialog}
        onClose={() => setShowTemplateDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle className="flex items-center justify-between">
          <span className="text-resume-800">Select a template</span>
          <IconButton aria-label="close" onClick={() => setShowTemplateDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
            {Object.values(AVAILABLE_TEMPLATES).map((template) => (
              <button
                key={template.id}
                type="button"
                className="flex flex-col items-center gap-2 p-3 rounded border border-resume-200 hover:border-resume-800 hover:shadow-level-4dp transition"
                onClick={() => handleTemplateClick(template.id)}
              >
                <div className="relative w-full h-[180px] overflow-hidden rounded border border-resume-200">
                  <Image
                    src={template.thumbnail}
                    alt={template.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <span className="text-resume-800 font-medium text-sm">{template.name}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* New or Existing Dialog */}
      <Dialog
        open={showNewExistingDialog}
        onClose={() => setShowNewExistingDialog(false)}
        maxWidth="sm"
        fullWidth
      >
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
        <DialogActions className="flex justify-between px-6 pb-4">
          <Button variant="outlined" onClick={handleCreateNew}>
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
    </motion.div>
  );
};

export default HomeLayout;
