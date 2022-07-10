import React from 'react';
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

//the props.children applies any children that the parent doesn't know ahead of time
export default  ({toolTipTitle, toolTipPlacement, toolTipClassName, btnOnClick, btnClassName, children}) => (
    <ToolTip title={toolTipTitle} className={toolTipClassName} placement={toolTipPlacement}>
        <IconButton onClick={btnOnClick} className={btnClassName}>
            {children}
        </IconButton>
    </ToolTip>
);
