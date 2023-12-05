import { apiUrl } from "@/config";
import httpService from "./httpService";

type PageSettingResponse = Promise<{ status: false; message: string } | { status: true; data: PageSetting }>;

async function getPageSetting(): Promise<PageSettingResponse> {
  try {
    const response = await httpService.getWithAuth(`${apiUrl}/pageSetting`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function getPageSettingByUsername(username: string): Promise<PageSettingResponse> {
  try {
    const response = await httpService.get(`${apiUrl}/pageSetting/byUsername/${username}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function uploadProfileImage(blobUrl: string): Promise<PageSettingResponse> {
  const blob = await fetch(blobUrl).then((r) => r.blob());

  const formData = new FormData();
  formData.append("profileImage", blob, "profileImage");

  try {
    const response = await httpService.postWithAuth(`${apiUrl}/pageSetting/profileImage`, formData);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function addNewLink(link: { title: string; url: string }): Promise<PageSettingResponse> {
  try {
    const response = await httpService.postWithAuth(`${apiUrl}/pageSetting/link`, link);
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function updateLink(link: { id: string; title: string; url: string; isActive: boolean }): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/link`, link);
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function deleteLink(id: string): Promise<PageSettingResponse> {
  try {
    const response = await httpService.delWithAuth(`${apiUrl}/pageSetting/link/${id}`);
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function sortLink(activeId: string, overId: string): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/link/sort`, { activeId, overId });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function updateTitle(title: string): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/title`, { title });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function updateBio(bio: string): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/bio`, { bio });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function updateColor(colors: Record<string, string>): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/appearance/color`, { ...colors });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function updateButtonStyle(buttonStyle: string): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/appearance/buttonStyle`, { buttonStyle });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function updateFont(id: string): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/appearance/font`, { id });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function updateBackgroundType(backgroundType: string): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/appearance/backgroundType`, { backgroundType });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function updateOrCreateSocial(social: { type: number; url: string; isActive: boolean }): Promise<PageSettingResponse> {
  try {
    const response = await httpService.postWithAuth(`${apiUrl}/pageSetting/socials`, social);
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function deleteSocial(type: number): Promise<PageSettingResponse> {
  try {
    const response = await httpService.delWithAuth(`${apiUrl}/pageSetting/socials/${type}`);
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function sortSocials(activeId: number, overId: number): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/socials/sort`, { activeId, overId });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function updateSocialsPosition(position: string): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/socials/position`, { position });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}
async function updateSocialsStyle(style: string): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/socials/style`, { style });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function updateSocialsIconColor(color: string): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/socials/color`, { color });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function updateSensitiveContent(sensitiveContent: string): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/sensitiveContent`, { sensitiveContent });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

async function updateMetaData({ key, value }: { key: "title" | "description"; value: string }): Promise<PageSettingResponse> {
  try {
    const response = await httpService.putWithAuth(`${apiUrl}/pageSetting/meta`, { [key]: value });
    if (response.ok) {
      return await response.json();
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

const pageSettingService = {
  getPageSetting,
  getPageSettingByUsername,
  uploadProfileImage,
  addNewLink,
  updateLink,
  deleteLink,
  sortLink,
  updateTitle,
  updateBio,
  updateColor,
  updateButtonStyle,
  updateFont,
  updateBackgroundType,
  updateOrCreateSocial,
  deleteSocial,
  sortSocials,
  updateSocialsPosition,
  updateSocialsStyle,
  updateSocialsIconColor,
  updateSensitiveContent,
  updateMetaData,
};

export default pageSettingService;
