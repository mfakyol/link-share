import PenIcon from "@/icons/PenIcon";
import DragIcon from "@/icons/DragIcon";
import { CSS } from "@dnd-kit/utilities";
import TrashIcon from "@/icons/TrashIcon";
import { useDispatch } from "react-redux";
import classes from "./styles.module.scss";
import { useCallback, useState } from "react";
import Switch from "@/components/common/Switch";
import Button from "@/components/common/Button";
import { useTranslation } from "@/contexts/TranslationContext";
import pageSettingService from "@/services/pageSettingService";
import CreateOrEditLinkPopup from "@/components/popups/CreateOrEditLinkPopup";
import { deleteLink, setPageSetting, sortLinks, updateLink } from "@/store/dashboardSlice";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, closestCenter, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";

interface LinksContentProps {
  pageSetting: PageSetting;
}

function LinksContent({ pageSetting }: LinksContentProps) {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const [popupData, setPopupData] = useState<{ show: boolean; link?: PageSetting["links"][number] }>({ show: false });

  const handleChangeActive = useCallback(
    async (link: PageSetting["links"][number], value: boolean) => {
      dispatch(updateLink({ ...link, isActive: value }));
      const response = await pageSettingService.updateLink({ id: link._id, title: link.title, url: link.url, isActive: value });

      if (response.status) dispatch(setPageSetting(response.data));
      else {
        dispatch(updateLink({ ...link, isActive: !value }));
      }
    },
    [dispatch]
  );

  const handleClickDelete = useCallback(
    async (link: PageSetting["links"][number]) => {
      const response = await pageSettingService.deleteLink(link._id);
      if (!response.status) {
        // will show error
      } else {
        dispatch(deleteLink(link._id));
      }
    },
    [dispatch]
  );

  const handleClickEdit = useCallback((link: PageSetting["links"][number]) => {
    setPopupData({ show: true, link });
  }, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      dispatch(sortLinks({ activeId: active.id as string, overId: over.id as string }));
      const response = await pageSettingService.sortLink(active.id as string, over.id as string);
      if (!response.status) {
        // will show error
        dispatch(sortLinks({ activeId: over.id as string, overId: active.id as string }));
      }
    },
    [dispatch]
  );

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <div className={classes.wrapper}>
      <Button color="blue" className={classes.createButton} onClick={setPopupData.bind(null, { show: true })}>
        {t("create_new_link")}
      </Button>
      <div className={classes.links}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext items={pageSetting?.links.map((l) => l._id)} strategy={verticalListSortingStrategy}>
            {pageSetting?.links.map((link) => (
              <LinkItem
                key={link._id}
                link={link}
                onChangeActive={handleChangeActive}
                onClickEdit={handleClickEdit}
                onClickDelete={handleClickDelete}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <CreateOrEditLinkPopup visible={popupData.show} link={popupData.link} onClose={setPopupData.bind(null, { show: false })} />
    </div>
  );
}

export default LinksContent;

function LinkItem({ link, onChangeActive, onClickEdit, onClickDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link._id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} className={classes.linkContainer} style={style} {...attributes}>
      <div className={classes.dragHandle} {...listeners}>
        <DragIcon className={classes.dragIcon} />
      </div>

      <div className={classes.fields}>
        <p className={classes.title}>{link.title}</p>
        <p className={classes.url}>{link.url}</p>
      </div>
      <div className={classes.actions}>
        <Switch checked={link.isActive} onChange={onChangeActive.bind(null, link)} />
        <PenIcon className={classes.penIcon} onClick={onClickEdit.bind(null, link)} />
        <TrashIcon className={classes.trashIcon} onClick={onClickDelete.bind(null, link)} />
      </div>
    </div>
  );
}
