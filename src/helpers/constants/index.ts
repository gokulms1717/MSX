import dynamic from 'next/dynamic';
import { IThemeColor, ITemplate } from './index.interface';

export const SYSTEM_COLORS: IThemeColor[] = [
  {
    backgroundColor: 'white',
    fontColor: 'black',
    titleColor: '#1890ff',
    highlighterColor: 'yellowgreen',
    id: 1,
  },
  {
    backgroundColor: 'white',
    fontColor: '#780650',
    titleColor: '#254000',
    highlighterColor: 'burlywood',
    id: 2,
  },
  {
    backgroundColor: '#FFFFFF',
    fontColor: '#000000',
    titleColor: '#217503',
    highlighterColor: '#F556E5',
    id: 3,
  },
];

export const AVAILABLE_TEMPLATES: ITemplate = {
  modern: {
    id: 'modern',
    name: 'Modern Resume',
    thumbnail: '/templates/modern.png',
    component: dynamic(() => import('@/templates/modern/MordernTemplate'), {
      ssr: false,
    }),
  },
  professional: {
    id: 'professional',
    name: 'Professional Resume',
    thumbnail: '/templates/professional.png',
    component: dynamic(() => import('@/templates/professional/ProfessionalTemplate'), {
      ssr: false,
    }),
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal Resume',
    thumbnail: '/templates/modern.png',
    component: dynamic(() => import('@/templates/minimal/MinimalTemplate'), {
      ssr: false,
    }),
  },
  creative: {
    id: 'creative',
    name: 'Creative Resume',
    thumbnail: '/templates/professional.png',
    component: dynamic(() => import('@/templates/creative/CreativeTemplate'), {
      ssr: false,
    }),
  },
  classic: {
    id: 'classic',
    name: 'Classic Resume',
    thumbnail: '/templates/modern.png',
    component: dynamic(() => import('@/templates/professional/ProfessionalTemplate'), {
      ssr: false,
    }),
  },
  executive: {
    id: 'executive',
    name: 'Executive Resume',
    thumbnail: '/templates/professional.png',
    component: dynamic(() => import('@/templates/sidebar/SidebarTemplate'), {
      ssr: false,
    }),
  },
  compact: {
    id: 'compact',
    name: 'Compact Resume',
    thumbnail: '/templates/modern.png',
    component: dynamic(() => import('@/templates/minimal/MinimalTemplate'), {
      ssr: false,
    }),
  },
  bold: {
    id: 'bold',
    name: 'Bold Resume',
    thumbnail: '/templates/professional.png',
    component: dynamic(() => import('@/templates/creative/CreativeTemplate'), {
      ssr: false,
    }),
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate Resume',
    thumbnail: '/templates/professional.png',
    component: dynamic(() => import('@/templates/professional/ProfessionalTemplate'), {
      ssr: false,
    }),
  },
  junior: {
    id: 'junior',
    name: 'Junior Resume',
    thumbnail: '/templates/modern.png',
    component: dynamic(() => import('@/templates/minimal/MinimalTemplate'), {
      ssr: false,
    }),
  },
  senior: {
    id: 'senior',
    name: 'Senior Resume',
    thumbnail: '/templates/professional.png',
    component: dynamic(() => import('@/templates/timeline/TimelineTemplate'), {
      ssr: false,
    }),
  },
  creativePlus: {
    id: 'creativePlus',
    name: 'Creative Plus',
    thumbnail: '/templates/professional.png',
    component: dynamic(() => import('@/templates/creative/CreativeTemplate'), {
      ssr: false,
    }),
  },
  minimalPlus: {
    id: 'minimalPlus',
    name: 'Minimal Plus',
    thumbnail: '/templates/modern.png',
    component: dynamic(() => import('@/templates/minimal/MinimalTemplate'), {
      ssr: false,
    }),
  },
};

export const CUSTOM_THEME_COLOR: IThemeColor = {
  backgroundColor: 'white',
  fontColor: 'black',
  titleColor: 'green',
  highlighterColor: '#ff7875',
  id: 4,
};

export const DATE_PICKER_FORMAT = 'DD/MM/YYYY';
