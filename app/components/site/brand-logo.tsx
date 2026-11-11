import Image from "next/image";
export default function BrandLogo({ width = 142, height = 46 }) {
  return <>
    <Image className="brand-logo brand-light" src="/brand/tessar/logo.svg" alt="Tessar" width={width} height={height} />
    <Image className="brand-logo brand-dark" src="/brand/tessar/logo-dark.svg" alt="Tessar" width={width} height={height} />
  </>;
}
