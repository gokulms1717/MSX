import { useContext } from 'react';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { BasicIntro } from '../modern/components/BasicIntro';
import { Objective } from '../modern/components/Objective';
import { WorkSection } from '../modern/components/Work';
import { EducationSection } from '../modern/components/Education';
import { SkillsSection } from '../modern/components/Skills';
import { AwardSection } from '../modern/components/Awards';

export default function CreativeTemplate() {
  const resumeData = useContext(StateContext);

  return (
    <div className="p-6">
      <div className="bg-resume-50 rounded-md p-4 mb-4">
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
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
          <SectionValidator value={resumeData.basics.objective}>
            <Objective objective={resumeData.basics.objective} />
          </SectionValidator>
          <SectionValidator value={resumeData.work}>
            <WorkSection experience={resumeData.work} />
          </SectionValidator>
          <SectionValidator value={resumeData.awards}>
            <AwardSection awardsReceived={resumeData.awards} />
          </SectionValidator>
        </div>
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          <SectionValidator value={resumeData.education}>
            <EducationSection education={resumeData.education} />
          </SectionValidator>
          <SectionValidator value={resumeData.skills.languages}>
            <SkillsSection title="Languages" list={resumeData.skills.languages} />
          </SectionValidator>
          <SectionValidator value={resumeData.skills.technologies}>
            <SkillsSection title="Technologies" list={resumeData.skills.technologies} />
          </SectionValidator>
          <SectionValidator value={resumeData.skills.frameworks}>
            <SkillsSection title="Frameworks & Libraries" list={resumeData.skills.frameworks} />
          </SectionValidator>
        </div>
      </div>
    </div>
  );
}
