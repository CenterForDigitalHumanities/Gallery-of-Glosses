interface LoadingBoxProps {
  label: string;
}

const LoadingBox: React.FC<LoadingBoxProps> = ({ label }) => (
  <div className="loading-box">
    <p>Loading {label}</p>
    <div className="loading"></div>
  </div>
);

export default LoadingBox;
