export interface IMenuItem {
    title?: string;
    icon?: string;
    link?: string;
    isAdmin?: boolean;
    expanded?: boolean;
    subMenu?: IMenuItem[];
  }
  
  export type Menu = IMenuItem[];
  