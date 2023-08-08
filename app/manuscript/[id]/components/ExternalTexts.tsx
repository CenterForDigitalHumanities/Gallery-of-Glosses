interface LinkProps {
  title: string;
  link: string;
}

interface ExternalTextsProps {
  links: Array<LinkProps>;
}

export const ExternalTexts: React.FC<ExternalTextsProps> = ({ links }) => {
  return (
    <div>
      <h2 className="text-2xl mb-4">External Texts</h2>
      <ul className="list-disc list-inside">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
