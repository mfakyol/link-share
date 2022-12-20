import { apiUrl } from "config";
import http from "services/http.service";
import classes from "./style.module.scss";
import Switch from "@components/_commons/Switch";
import { useSelector, useDispatch } from "react-redux";
import LinkInput from "@components/_commons/LinkInput";
import { validateLinkTitle, validateUrl } from "@lib/validator";
import { setPageLinks, updatePageLink } from "store/panelSlice";
import React, { useCallback, useRef, useState, useId } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
        dispatch(setPageLinks(tempLinks));
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
  const dispatch = useDispatch();

  const hrefId = useId();
  const titleId = useId();

  const switchRef = useRef();
  const hrefInputRef = useRef();
  const titleInputRef = useRef();

  const [titleError, setTitleError] = useState(validateLinkTitle(link.title));
  const [hrefError, setHrefError] = useState(validateUrl(link.href));

  const updateLink = () => {
    if (
      titleInputRef.current.value != link.title ||
      hrefInputRef.current.value != link.href ||
      switchRef.current.checked != link.show
    ) {
      let isValid = true;
      const urlValidationError = validateUrl(hrefInputRef.current.value);
      const titleValidationError = validateLinkTitle(titleInputRef.current.value);
      setHrefError(urlValidationError);
      setTitleError(titleValidationError);

      if (urlValidationError) isValid = false;
      if (titleValidationError) isValid = false;

      dispatch(
        updatePageLink({
          ...link,
          title: titleInputRef.current.value,
          href: hrefInputRef.current.value,
          show: switchRef.current.checked,
          isValid,
        })
      );

      try {
        http
          .postWithAuth(`${apiUrl}/link/update`, {
            ...link,
            title: titleInputRef.current.value,
            href: hrefInputRef.current.value,
            show: switchRef.current.checked,
            isValid,
          })
          .then((res) => res.json());
      } catch (error) {
        console.log(error);
      }
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
                <label className={classes.label} htmlFor={titleId}>
                  Title:
                </label>

                <LinkInput
                  id={titleId}
                  defaultValue={link.title}
                  error={titleError}
                  ref={titleInputRef}
                  onBlur={updateLink}
                />
              </div>
              <div className={classes.inputRow}>
                <label className={classes.label} htmlFor={hrefId}>
                  Link:
                </label>

                <LinkInput
                  id={hrefId}
                  defaultValue={link.href}
                  error={hrefError}
                  ref={hrefInputRef}
                  onBlur={updateLink}
                />
              </div>
            </div>

            <div className={classes.settings}>
              <Switch className={classes.switch} ref={switchRef} defaultChecked={link.show} onChange={updateLink} />
              <img className={classes.deleteIcon} src="/icons/trash.svg" alt="" onClick={() => removeLink(link._id)} />
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};
