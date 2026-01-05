import React from "react";

export type StaticImageData = string;

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | StaticImageData;
    alt: string;
    width?: number;
    height?: number;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height, className, ...props }) => {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            loading="lazy"
            {...props}
        />
    );
};

export default Image;
