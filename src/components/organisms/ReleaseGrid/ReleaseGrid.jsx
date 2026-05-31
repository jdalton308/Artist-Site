import ReleaseCard from "@/components/molecules/ReleaseCard/ReleaseCard";
import "./ReleaseGrid.css";

export default function ReleaseGrid({ releases = [] }) {
  return (
    <div className="release-grid">
      {releases.map((release) => (
        <ReleaseCard key={release.id} release={release} />
      ))}
    </div>
  );
}
