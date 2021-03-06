import React, { useCallback } from "react";
import { useWriter } from "../../contexts/WriterContext";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../types";
import { format } from "date-fns";
import { updateShowPreview } from "../../reducers";
import { pick } from "lodash-es";

export function BottomHelper() {
  const writer = useWriter();
  const dispatch = useDispatch();
  const { showPreview } = useSelector((s: AppState) =>
    pick(s, ["showPreview"])
  );
  const onClickEye = useCallback(
    (ev: any) => {
      ev.preventDefault();
      dispatch(updateShowPreview(!showPreview));
    },
    [showPreview]
  );

  return (
    <div
      style={{
        position: "absolute",
        right: "20px",
        bottom: "20px",
        padding: 3,
        outline: "none",
        paddingRight: 7,
        borderRadius: 2,
        background: "#333",
        color: "#fff"
      }}
    >
      &nbsp;
      <button style={{ borderRadius: 3 }} onClick={onClickEye}>
        👀
      </button>
      &nbsp;
      {writer.handler && (
        <>
          &nbsp;
          <span>{writer.handler.name}</span>
          <span>{format(writer.timestamp, "HH:mm:ss")}</span>
        </>
      )}
    </div>
  );
}
