// VueHost.jsx
import React, { useEffect } from "react";

const VueHost = () => {
    useEffect(() => {
        // Dynamically import and run Vue only when this React component mounts
        import("../main-vue.js").then(({ mountVueApp }) => {
            mountVueApp("#vue-root");
        });

        // cleanup on unmount
        return () => {
            const vueRoot = document.getElementById("vue-root");
            if (vueRoot) vueRoot.innerHTML = "";
        };
    }, []);

    return <div id="vue-root" className="w-full h-full"></div>;
};

export default VueHost;
