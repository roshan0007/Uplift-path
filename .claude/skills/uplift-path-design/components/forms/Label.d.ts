import * as React from "react";

/** Form field label — flex row, 8px gap, so a checkbox or radio can sit inline. */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export declare function Label(props: LabelProps): React.JSX.Element;
