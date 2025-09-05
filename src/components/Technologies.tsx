import TypescriptPlain from 'devicons-react/icons/TypescriptPlain';
import ReactOriginal from 'devicons-react/icons/ReactOriginal';
import RubyPlain from 'devicons-react/icons/RubyPlain';
import RailsPlain from 'devicons-react/icons/RailsPlain';
import GraphqlPlain from 'devicons-react/icons/GraphqlPlain';
import NextjsPlain from 'devicons-react/icons/NextjsPlain'

export function Technologies({ technologies }: { technologies: string[] }) {
  return (
    <div className="flex flex-row flex-wrap gap-2 mt-2">
      {technologies.map((technology, index) => (
        <span key={index} className="flex gap-2 items-center rounded-xl py-2 px-4 text-gray-950 dark:text-gray-100 text-sm bg-gray-200/40 dark:bg-gray-800/40 border-gray-300 dark:border-gray-700 border-1">
          {getTechnologyIcon(technology)} {technology}
        </span>
      ))}
    </div>
  );
}

function getTechnologyIcon(technology: string): React.ReactNode | null{
  switch (technology) {
    case "TypeScript":
      return <TypescriptPlain />
    case "React":
      return <ReactOriginal />
    case "Ruby":
      return <RubyPlain />
    case "Ruby on Rails":
      return <RailsPlain />
    case "GraphQL":
      return <GraphqlPlain />
    case "Next.js":
      return <NextjsPlain />
    default:
      return null;
  }
}