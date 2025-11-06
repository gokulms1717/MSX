import { useContext } from 'react';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';

export default function TimelineTemplate() {
  const resumeData = useContext(StateContext);
  const work = resumeData.work || [];
  const education = resumeData.education || [];

  return (
    <div className="p-6">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-3xl font-semibold text-resume-800">{resumeData.basics.name}</h1>
        <p className="text-resume-600">{resumeData.basics.label}</p>
        <div className="text-sm text-resume-600">
          {resumeData.basics.email} • {resumeData.basics.phone} • {resumeData.basics.location.city}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-5">
        {/* Timeline column */}
        <div className="col-span-12 md:col-span-7">
          <SectionValidator value={work}>
            <section className="mb-6">
              <h2 className="text-xl text-resume-800 mb-2">Experience</h2>
              <div className="relative pl-6">
                <div className="absolute left-1 top-0 bottom-0 w-[2px] bg-resume-200" />
                {work.map((exp: any, idx: number) => (
                  <div key={idx} className="mb-4 relative">
                    <div className="absolute -left-[7px] top-1 h-3 w-3 bg-resume-500 rounded-full" />
                    <div className="text-resume-800 font-medium">
                      {exp.position} • {exp.name}
                    </div>
                    <div className="text-resume-600 text-sm">
                      {exp.startDate} – {exp.endDate || 'Present'}
                    </div>
                    {exp.summary && <p className="text-sm text-resume-600 mt-1">{exp.summary}</p>}
                  </div>
                ))}
              </div>
            </section>
          </SectionValidator>

          <SectionValidator value={education}>
            <section>
              <h2 className="text-xl text-resume-800 mb-2">Education</h2>
              <div className="relative pl-6">
                <div className="absolute left-1 top-0 bottom-0 w-[2px] bg-resume-200" />
                {education.map((ed: any, idx: number) => (
                  <div key={idx} className="mb-4 relative">
                    <div className="absolute -left-[7px] top-1 h-3 w-3 bg-resume-500 rounded-full" />
                    <div className="text-resume-800 font-medium">{ed.institution}</div>
                    <div className="text-resume-600 text-sm">
                      {ed.area} • {ed.studyType}
                    </div>
                    <div className="text-resume-600 text-sm">
                      {ed.startDate} – {ed.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </SectionValidator>
        </div>

        {/* Sidebar column */}
        <aside className="col-span-12 md:col-span-5">
          <SectionValidator value={resumeData.basics.summary}>
            <section className="mb-4">
              <h2 className="text-xl text-resume-800 mb-2">Summary</h2>
              <p className="text-sm text-resume-600 whitespace-pre-line">
                {resumeData.basics.summary}
              </p>
            </section>
          </SectionValidator>

          <SectionValidator value={resumeData.skills?.languages}>
            <section className="mb-4">
              <h2 className="text-xl text-resume-800 mb-2">Languages</h2>
              <ul className="text-sm text-resume-600 list-disc list-inside">
                {resumeData.skills.languages.map((s: any, i: number) => (
                  <li key={i}>{s.name || s}</li>
                ))}
              </ul>
            </section>
          </SectionValidator>

          <SectionValidator value={resumeData.skills?.technologies}>
            <section className="mb-4">
              <h2 className="text-xl text-resume-800 mb-2">Technologies</h2>
              <ul className="text-sm text-resume-600 list-disc list-inside">
                {resumeData.skills.technologies.map((s: any, i: number) => (
                  <li key={i}>{s.name || s}</li>
                ))}
              </ul>
            </section>
          </SectionValidator>
        </aside>
      </div>
    </div>
  );
}
