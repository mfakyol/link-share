import PenIcon from "@/icons/PenIcon";
import DragIcon from "@/icons/DragIcon";
import classes from "./page.module.scss";
import { CSS } from "@dnd-kit/utilities";
import TrashIcon from "@/icons/TrashIcon";
import { useDispatch } from "react-redux";
import Button from "@/components/common/Button";
import Switch from "@/components/common/Switch";
import socialTypes from "@/constants/socialTypes";
import { MouseEvent, useCallback, useState } from "react";
import pageSettingService from "@/services/pageSettingService";
import { useTranslation } from "@/contexts/TranslationContext";
import { setPageSetting, sortSocials } from "@/store/dashboardSlice";
import CreateOrEditSocialPopup from "@/components/popups/CreateOrEditSocialPopup";
import EditSocialIconStyleCard from "@/components/dashboard/EditSocialIconStyleCard";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";

interface SocialsContentProps {
  pageSetting: PageSetting;
}

function SocialsContent({ pageSetting }: SocialsContentProps) {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [popupData, setPopupData] = useState<{ show: boolean; social?: PageSetting["socials"][number] }>({ show: false });

  const handleClickCreateSocial = useCallback(() => {
    setPopupData({ show: true, social: undefined });
  }, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      dispatch(sortSocials({ activeId: active.id as number, overId: over.id as number }));
      const response = await pageSettingService.sortSocials(active.id as number, over.id as number);
      if (!response.status) {
        // will show error
        dispatch(sortSocials({ activeId: over.id as number, overId: active.id as number }));
      }
    },
    [dispatch]
  );

  const handleClickDelete = useCallback(
    async (social: PageSetting["socials"][number], e: MouseEvent) => {
      const response = await pageSettingService.deleteSocial(social.type);
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    },
    [dispatch]
  );
  const handleChangeActive = useCallback(
    async (social: PageSetting["socials"][number], e: MouseEvent) => {
      const { url, type, isActive } = social;
      const response = await pageSettingService.updateOrCreateSocial({ url, type, isActive: !isActive });
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    },
    [dispatch]
  );

  const handleClickEdit = useCallback(async (social: PageSetting["socials"][number], e: MouseEvent) => {
    setPopupData({ show: true, social });
  }, []);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <div className={classes.wrapper}>
      <Button color="blue" className={classes.createButton} onClick={handleClickCreateSocial}>
        {t("create_new_social")}
      </Button>

      <div className={classes.socials}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext items={pageSetting?.socials.map((sl) => sl.type)} strategy={verticalListSortingStrategy}>
            {pageSetting?.socials.map((social) => (
              <SocialItem
                key={social.type}
                social={social}
                onClickDelete={handleClickDelete}
                onChangeActive={handleChangeActive}
                onClickEdit={handleClickEdit}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <EditSocialIconStyleCard pageSetting={pageSetting} />
      <CreateOrEditSocialPopup visible={popupData.show} social={popupData.social} onClose={setPopupData.bind(null, { show: false })} />
    </div>
  );
}

export default SocialsContent;

function SocialItem({ social, onChangeActive, onClickEdit, onClickDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: social.type });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const socialType = socialTypes.find((st) => st.type === social.type);
  return (
    <div ref={setNodeRef} className={classes.socialContainer} style={style} {...attributes}>
      <div className={classes.dragHandle} {...listeners}>
        <DragIcon className={classes.dragIcon} />
      </div>
      <div className={classes.detail}>
        <img className={classes.socialIcon} src={`/socialIcons/color/${socialType?.icon}.svg`} alt="" />
        <span className={classes.socialText}>{socialType?.label}</span>
      </div>
      <div className={classes.actions}>
        <Switch checked={social.isActive} onChange={onChangeActive.bind(null, social)} />
        <PenIcon className={classes.penIcon} onClick={onClickEdit.bind(null, social)} />
        <TrashIcon className={classes.trashIcon} onClick={onClickDelete.bind(null, social)} />
      </div>
    </div>
  );
}
