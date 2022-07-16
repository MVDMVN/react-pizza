import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="137" cy="137" r="125" />
    <rect x="0" y="274" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="311" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="423" rx="10" ry="10" width="100" height="30" />
    <rect x="117" y="413" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
