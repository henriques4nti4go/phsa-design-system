import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

type AvatarProps = {
  src: string;
  alt: string;
  className?: string;
  avatarFallback: string;
};

export function Avatar({ src, alt, className, avatarFallback }: AvatarProps) {
  return (
    <AvatarComponent>
      <AvatarImage src={src} alt={alt} className={className} />
      <AvatarFallback>{avatarFallback}</AvatarFallback>
    </AvatarComponent>
  );
}
