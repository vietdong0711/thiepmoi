import { dressCode } from '../data.js'

export default function DressCode() {
  return (
    <div className="dress-section">
      <div className="dress-heading">
        <h2 className="dress-title">{dressCode.title}</h2>
        <p className="dress-subtitle">{dressCode.subtitle}</p>
      </div>
      <div className="dress-colors">
        {dressCode.colors.map((color) => (
          <span
            className="dress-swatch"
            key={color}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  )
}
