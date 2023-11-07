type PageSetting = {
  _id: string;
  username: string;
  profileImage: string;
  title: string;
  bio: string;
  backgroundType: string;
  sensitiveContent: string;
  font: {
    _id: string;
    createdAt: Date;
    fontFamily: string;
    fontCode: string;
    titleFontSize: string;
    titleFontWeight: string;
    descriptionFontSize: string;
    descriptionFontWeight: string;
    buttonFontSize: string;
    buttonFontWeight: string;
  };
  buttonStyle: string;
  links: {
    _id: string;
    createdAt: Date;
    url: string;
    title: string;
    isActive: boolean;
  }[];
  socials: {
    type: number;
    createdAt: Date;
    url: string;
    isActive: boolean;
  }[];
  socialsIconStyle: string;
  socialsIconColor: string;
  socialsPositon: string;
  colors: {
    backgroundColor: string;
    fontColor: string;
    buttonColor: string;
    buttonFontColor: string;
    buttonShadowColor: string;
    gradientDirection: string;
  };
  meta: {
    title: string;
    description: string;
  };
};

type Background = {
  _id: string;
  name: string;
  placeholderImage: String;
};
