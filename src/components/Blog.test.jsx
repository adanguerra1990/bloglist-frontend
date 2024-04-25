import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

describe('<Blog />', () => {
    test('Muestra el titulo y el author del blog, pero no la url y los likes de forma predeterminada', () => {
        const blog = {
            title: 'Titulo del Libro',
            author: 'Fabricio',
            url: 'www.urlprueba.com',
            likes: 2,
            user: {
                name: 'User test',
                id: 1
            }
        }

        // Mock de funciones
        const updateLikes = vi.fn()
        const onDelete = vi.fn()

        // Mock del servicio de blogs
        vi.mock('../services/blogs', () => ({
            updateLikes: vi.fn(),
            onDelete: vi.fn()
        }))

        // Renderización del componente
        const { container } = render(
            <Blog blog={blog} updateLikes={updateLikes} onDelete={onDelete} currentUserId='1' />
        )

        // Selección del contenedor del blog por su clase CSS
        const blogContainer = container.querySelector('.container-blog')

        // Verificación de la presencia del título y el autor
        expect(blogContainer).toHaveTextContent('Titulo del Libro')
        expect(blogContainer).toHaveTextContent('Fabricio')

        // Verificación de la ausencia de la URL y los likes
        expect(blogContainer).not.toHaveTextContent('www.urlprueba.com')
        expect(blogContainer).not.toHaveTextContent('likes: 2')
    })
});