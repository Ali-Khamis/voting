import React, { forwardRef } from "react";

const SignOut = forwardRef(
  ({ onClick, href }: { onClick: any; href: string }, ref: any) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        SignOut
      </a>
    );
  }
);

export default SignOut;
