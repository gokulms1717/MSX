import { useContext } from 'react';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { BasicIntro } from '../modern/components/BasicIntro';
import { SummarySection } from '../modern/components/Summary';
import { Objective } from '../modern/components/Objective';
import { WorkSection } from '../modern/components/Work';
import { EducationSection } from '../modern/components/Education';
import { SkillsSection } from '../modern/components/Skills';

export default function MinimalTemplate() {
  const resumeData = useContext(StateContext);

  return (
    <div className="p-6">
      <BasicIntro
        name={resumeData.basics.name}
        label={resumeData.basics.label}
        url={resumeData.basics.url}
        email={resumeData.basics.email}
        city={resumeData.basics.location.city}
        phone={resumeData.basics.phone}
        image={resumeData.basics.image}
        profiles={resumeData.basics.profiles}
      />

      <SectionValidator value={resumeData.basics.summary}>
        <SummarySection summary={resumeData.basics.summary} />
      </SectionValidator>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <SectionValidator value={resumeData.work}>
            <WorkSection experience={resumeData.work} />
          </SectionValidator>
          <SectionValidator value={resumeData.education}>
            <EducationSection education={resumeData.education} />
          </SectionValidator>
        </div>
        <div className="col-span-12 md:col-span-4">
          <SectionValidator value={resumeData.basics.objective}>
            <Objective objective={resumeData.basics.objective} />
          </SectionValidator>
          <SectionValidator value={resumeData.skills.languages}>
            <SkillsSection title="Languages" list={resumeData.skills.languages} />
          </SectionValidator>
          <SectionValidator value={resumeData.skills.frameworks}>
            <SkillsSection title="Frameworks" list={resumeData.skills.frameworks} />
          </SectionValidator>
          <SectionValidator value={resumeData.skills.tools}>
            <SkillsSection title="Tools" list={resumeData.skills.tools} />
          </SectionValidator>
        </div>
      </div>
    </div>
  );
}
