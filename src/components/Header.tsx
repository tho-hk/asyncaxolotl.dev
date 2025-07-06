// Header and nav bar for reuse
// for pages that will use it add the line:
// import Header from '@/components/Header'

export default function Header () {
    return (
        <header style={{
            borderBottom: '1px solid #eee',
            paddingBottom: '1rem',
            marginBottom: '2rem'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' , alignItems: 'center' }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Hello Async friends!</h1>
                <nav>
                    <a href="/" style={{ marginRight: '1rem', textDecoration: 'none' }}>Home</a>
                    <a href="/blog" style = {{ textDecoration: 'none' }}>Blog</a>
                </nav>
            </div>
        </header>
    )
}