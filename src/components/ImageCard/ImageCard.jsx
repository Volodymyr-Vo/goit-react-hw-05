import css from "./ImageCard.module.css";

export default function ImageCard({ image, onClick }) {
  if (!image || !image.urls) return null;
  return (
    <div className={css.card} onClick={() => onClick(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "image"}
        className={css.image}
      />
    </div>
  );
}
