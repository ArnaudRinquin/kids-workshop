import { useInView } from "react-intersection-observer";

export function SectionListWrapper({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
  setActiveSectionId: (sectionId: string) => void;
}) {
  const [ref] = useInView({
    onChange: (inView) => {
      if (inView) {
        props.setActiveSectionId(props.id);
      }
    },
  });
  return <section ref={ref} {...props} className={className} />;
}
