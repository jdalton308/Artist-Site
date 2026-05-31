import Button from "@/components/atoms/Button/Button";
import Heading from "@/components/atoms/Heading/Heading";
import Text from "@/components/atoms/Text/Text";
import GradientBackground from "@/components/atoms/GradientBackground/GradientBackground";
import "./Hero.css";

export default function Hero({
  headline,
  subheadline,
  imageUrl,
  ctaLabel,
  ctaUrl,
}) {
  return (
    <GradientBackground className="hero">
      {imageUrl && (
        <div className="hero__bg">
          <img src={imageUrl} alt="" className="hero__bg-image" aria-hidden="true" />
          <div className="hero__bg-overlay" />
        </div>
      )}
      <div className="container hero__content">
        <Heading as="h1" size="xl" className="heading--gradient">
          {headline}
        </Heading>
        {subheadline && <Text variant="lead">{subheadline}</Text>}
        {ctaLabel && ctaUrl && (
          <div className="hero__actions">
            <Button href={ctaUrl} variant="primary" size="lg">
              {ctaLabel}
            </Button>
            <Button href="/live" variant="secondary" size="lg">
              Tour Dates
            </Button>
          </div>
        )}
      </div>
    </GradientBackground>
  );
}
