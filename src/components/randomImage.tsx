"use client";

import { useEffect, useState } from "react";

const RandomImage = () => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const images = ["/images/bangsaen.png", "/images/chang.png", "/images/thailand.png"];
    const random = images[Math.floor(Math.random() * images.length)];
    setImage(random);
  }, []);

  return (
    <div className="h-[90vh] w-[100%] flex justify-center items-center">
      {image && <img src={image} alt="circuit img" className="h-[60vh] sm:h-[90vh] w-auto" />}
    </div>
  );
};

export default RandomImage;