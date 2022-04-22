import React from "react";
import { deleteIconSVG } from "./../../../svgs/deleteIcon";
import { eye } from "./../../../svgs/eye";
import { blockSVG } from "./../../../svgs/blockIcon";
import { unblockIcon } from './../../../svgs/unblockIcon';

export default (props) => {
  const { onDelete, onShow, onBlock, onExpand, isBlocked } = props;

  const onDeleteAction = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(props);
  };

  const onShowAction = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onShow(props);
  };

  const onBlockAction = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onBlock(props);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {onShow && (
        <div style={{ cursor: "pointer" }} onClick={onShowAction}>
          {eye}
        </div>
      )}
      {onDelete && (
        <div style={{ cursor: "pointer" }} onClick={onDeleteAction}>
          {deleteIconSVG}
        </div>
      )}

      {onBlock && (
        <div style={{ cursor: "pointer" }} onClick={onBlockAction}>
          {isBlocked && isBlocked(props) ? unblockIcon : blockSVG}
        </div>
      )}
      {onExpand && (
        <div style={{ cursor: "pointer" }} onClick={onExpand}>
          <i className="fa fa-plus" />
        </div>
      )}
    </div>
  );
};
