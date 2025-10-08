import Image from "next/image"

interface Props {
    src?: string;
    alt: string;
    width: number;
    height: number;
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
}


export const ProductImage = ({src, alt, width, height, className, style}: Props) => {
    const localSrc = ( src ) 
                        ? src.startsWith('http') 
                            ? src 
                            : `/products/${ src }`
                        : '/imgs/placeholder.jpg' ;
  
    return (
      <Image src={localSrc} 
             width={ width } 
             height={ height } 
             alt={ alt } 
             className={ className } 
             style={ style }
        />
  )
}
