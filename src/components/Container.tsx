import React, { FC } from "react";


const Container: FC = ({children}) => {
    return (
        <div className='container'>
            {children}
        </div>
    );
};

export default Container;