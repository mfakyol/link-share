import { apiUrl } from "config";
import React, { useCallback, useEffect, useRef, useState } from "react";
import http from "services/http.service";
import classes from "./style.module.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPageLinks } from "store/panelSlice";

function Links() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.panel.page);
  const [loading, setLoading] = useState();

  const handleAddNewLink = useCallback(async () => {
    try {
      const response = await http.postWithAuth(`${apiUrl}/link/create`).then((res) => res.json());

      if (response.status) dispatch(setPageLinks(response.data.links));
      //will error alert
      else console.log(response);
    } catch (error) {}
  }, [dispatch]);

  const removeLink = useCallback(
    (linkId) => {
      try {
        http
          .postWithAuth(`${apiUrl}/link/remove`, {
            linkId,
          })
          .then((res) => res.json())
          .then((res) => {
            dispatch(setPageLinks(page.links.filter((l) => l._id != linkId)));
          });
      } catch (error) {}
    },
    [page, dispatch]
  );

  async function handleOnDragEnd(result) {
    if (!result.destination) return;

    const tempLinks = Array.from(page.links);
    const [reorderedItem] = tempLinks.splice(result.source.index, 1);
    tempLinks.splice(result.destination.index, 0, reorderedItem);

    try {
      const response = await http
        .postWithAuth(`${apiUrl}/link/reorder`, { reorderedLinks: tempLinks })
        .then((res) => res.json());

      if (response.status) {
        console.log(response);
      }
    } catch (error) {}
  }

  return (
    page && (
      <div className={classes.linksWrapper}>
        <button className={classes.addLinkButton} onClick={handleAddNewLink}>
          Add New Link
        </button>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="links">
            {(provided) => (
              <ul className={classes.links} {...provided.droppableProps} ref={provided.innerRef}>
                {page.links.map((link, index) => (
                  <LinkItem key={link._id} link={link} index={index} removeLink={removeLink} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  );
}

export default Links;

const LinkItem = ({ link, index, removeLink }) => {
  const titleInputRef = useRef();
  const hrefInputRef = useRef();

  useEffect(() => {
    titleInputRef.current.value = link.title;
    hrefInputRef.current.value = link.href;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateLink = () => {
    if (titleInputRef.current.value != link.title || hrefInputRef.current.value != link.href) {
      try {
        http
          .postWithAuth(`${apiUrl}/link/update`, {
            ...link,
            title: titleInputRef.current.value,
            href: hrefInputRef.current.value,
          })
          .then((res) => res.json());
      } catch (error) {}
    }
  };

  return (
    <Draggable draggableId={link._id} index={index}>
      {(provided) => (
        <li className={classes.link} ref={provided.innerRef} {...provided.draggableProps}>
          <div className={classes.drag} {...provided.dragHandleProps}>
            <img className={classes.dragIcon} src="/icons/drag.svg" alt="" />
          </div>
          <div className={classes.content}>
            <div className={classes.inputs}>
              <div className={classes.inputRow}>
                <label className={classes.label} htmlFor="">
                  Title:
                </label>
                <input className={classes.input} type="text" ref={titleInputRef} onBlur={updateLink} />
              </div>
              <div className={classes.inputRow}>
                <label className={classes.label} htmlFor="">
                  Link:
                </label>
                <input className={classes.input} type="text" ref={hrefInputRef} onBlur={updateLink} />
              </div>
            </div>

            <div className={classes.settings}>
              <img className={classes.deleteIcon} src="/icons/trash.svg" alt="" onClick={() => removeLink(link._id)} />
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};
