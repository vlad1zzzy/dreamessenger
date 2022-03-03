import React, {useState} from "react";

export const useScrollTop = () => {
    const [scrollTop, setScrollTop] = useState(0);

    const onScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
        setScrollTop((<HTMLDivElement>event.target).scrollTop)
    };

    return {
        scrollTop,
        onScroll,
    };
}