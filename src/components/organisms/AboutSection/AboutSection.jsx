import Heading from "@/components/atoms/Heading/Heading";
import Text from "@/components/atoms/Text/Text";
import "./AboutSection.css";

export default function AboutSection({ about }) {
  return (
    <div className="about-section">
      <div className="about-section__intro">
        <Heading size="lg">{about.title}</Heading>
        {about.intro && <Text variant="lead">{about.intro}</Text>}
      </div>

      {about.photos?.length > 0 && (
        <div className="about-section__photos">
          {about.photos.map((photo, i) => (
            <figure key={i} className="about-section__photo">
              <img src={photo.url} alt={photo.alt} />
            </figure>
          ))}
        </div>
      )}

      <div className="about-section__details">
        {about.labelName && (
          <div className="about-section__block">
            <Text variant="label">Label</Text>
            <Heading as="h3" size="sm">
              {about.labelName}
            </Heading>
          </div>
        )}

        {about.soundDescription && (
          <div className="about-section__block">
            <Text variant="label">The Sound</Text>
            <Text variant="body">{about.soundDescription}</Text>
          </div>
        )}

        {about.goals && (
          <div className="about-section__block">
            <Text variant="label">Vision</Text>
            <Text variant="body">{about.goals}</Text>
          </div>
        )}
      </div>
    </div>
  );
}
