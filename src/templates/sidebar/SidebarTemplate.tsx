import { useContext } from 'react';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';

export default function SidebarTemplate() {
  const resumeData = useContext(StateContext);

  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-5">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-4 bg-resume-50 rounded-md p-4">
          <div className="mb-3">
            <h1 className="text-2xl font-semibold text-resume-800">{resumeData.basics.name}</h1>
            <p className="text-resume-600">{resumeData.basics.label}</p>
          </div>
          <div className="text-sm text-resume-600 mb-4">
            <div>{resumeData.basics.email}</div>
            <div>{resumeData.basics.phone}</div>
            <div>{resumeData.basics.location.city}</div>
            {resumeData.basics.url && <div>{resumeData.basics.url}</div>}
          </div>

          <SectionValidator value={resumeData.skills?.languages}>
            <section className="mb-4">
              <h2 className="text-resume-800 font-medium mb-2">Skills</h2>
              <ul className="text-sm text-resume-600 list-disc list-inside">
                {resumeData.skills.languages
                  .concat(resumeData.skills.technologies)
                  .slice(0, 10)
                  .map((s: any, i: number) => (
                    <li key={i}>{s.name || s}</li>
                  ))}
              </ul>
            </section>
          </SectionValidator>
        </aside>

        {/* Main */}
        <main className="col-span-12 md:col-span-8">
          <SectionValidator value={resumeData.basics.summary}>
            <section className="mb-5">
              <h2 className="text-xl text-resume-800 mb-2">Summary</h2>
              <p className="text-sm text-resume-600 whitespace-pre-line">
                {resumeData.basics.summary}
              </p>
            </section>
          </SectionValidator>

          <SectionValidator value={resumeData.work}>
            <section className="mb-5">
              <h2 className="text-xl text-resume-800 mb-2">Experience</h2>
              {resumeData.work.map((exp: any, idx: number) => (
                <div key={idx} className="mb-3">
                  <div className="text-resume-800 font-medium">
                    {exp.position} • {exp.name}
                  </div>
                  <div className="text-resume-600 text-sm">
                    {exp.startDate} – {exp.endDate || 'Present'}
                  </div>
                  {exp.summary && <p className="text-sm text-resume-600 mt-1">{exp.summary}</p>}
                </div>
              ))}
            </section>
          </SectionValidator>

          <SectionValidator value={resumeData.education}>
            <section>
              <h2 className="text-xl text-resume-800 mb-2">Education</h2>
              {resumeData.education.map((ed: any, idx: number) => (
                <div key={idx} className="mb-2">
                  <div className="text-resume-800 font-medium">{ed.institution}</div>
                  <div className="text-resume-600 text-sm">
                    {ed.area} • {ed.studyType}
                  </div>
                  <div className="text-resume-600 text-sm">
                    {ed.startDate} – {ed.endDate}
                  </div>
                </div>
              ))}
            </section>
          </SectionValidator>
        </main>
      </div>
    </div>
  );
}
