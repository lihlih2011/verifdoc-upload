
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    width?: number;
    height?: number;
    alt: string;
}

export default function Image({ src, width, height, alt, ...props }: ImageProps) {
    return (
        <img
            src={src}
            width={width}
            height={height}
            alt={alt}
            {...props}
        />
    );
}
