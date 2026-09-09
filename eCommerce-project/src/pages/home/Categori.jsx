import './Categori.css'

export function Category({ category, selected, onSelect }) {
    return (
        <div className="categories-container">
            <div className="category-item">
                <button
                    className={!selected ? 'active' : ''}
                    onClick={() => onSelect(null)}
                >
                    Всі товари
                </button>
            </div>

            {category.map((cat) => (
                <div key={cat.id} className="category-item">
                    <button
                        className={selected === cat.slug ? 'active' : ''}
                        onClick={() => onSelect(cat.slug)}
                    >
                        {cat.name}
                    </button>
                </div>
            ))}
        </div>
    )
}