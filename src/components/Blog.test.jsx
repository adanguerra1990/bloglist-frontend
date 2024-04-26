import { render, screen, waitFor } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event";

describe('<Blog />', () => {

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
    const handleLike = vi.fn()

    // Mock del servicio de blogs
    vi.mock('../services/blogs', () => ({
        updateLikes: vi.fn(),
        onDelete: vi.fn()
    }))

    test('Muestra el titulo y el author del blog, pero no la url y los likes de forma predeterminada', () => {

        // Renderización del componente
        const { container } = render(
            <Blog blog={blog} updateLikes={updateLikes} onDelete={onDelete} currentUserId='1' />
        )

        // Selección del contenedor del blog por su clase CSS
        const blogContainer = container.querySelector('.container-blog')

        // Verificación de la presencia del título y el autor
        expect(blogContainer).toHaveTextContent(blog.title)
        expect(blogContainer).toHaveTextContent(blog.author)

        // Verificación de la ausencia de la URL y los likes
        expect(blogContainer).not.toHaveTextContent(blog.url)
        expect(blogContainer).not.toHaveTextContent(`likes: ${blog.likes}`)
    })

    test('Muestra la URL y los likes del blog cuando se hace clic en el botón de view', async () => {
        render(
            <Blog blog={blog} updateLikes={updateLikes} onDelete={onDelete} currentUserId='1' />
        )
        // Verifica que el botón para mostrar detalles está presente y hace clic en él
        const detailsButton = screen.getByText('view')
        userEvent.click(detailsButton)

        // Verifica que la URL del blog y el número de likes se muestran
        const blogUrl = await screen.findByText(blog.url)
        const blogLikes = await screen.findByText(`likes: ${blog.likes}`)

        expect(blogUrl).toBeInTheDocument()
        expect(blogLikes).toBeInTheDocument()

        expect(detailsButton).toHaveTextContent('hide')
        userEvent.click(detailsButton)

        // Espera a que el DOM se actualice antes de realizar las aserciones
        await waitFor(() => {
            expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
            expect(screen.queryByText(`likes: ${blog.likes}`)).not.toBeInTheDocument()
        })

        expect(detailsButton).toHaveTextContent('view')
    })

    test('llama a updateLikes dos veces cuando se hace clic dos veces en el botón Me gusta', async () => {
        render(
            <Blog blog={blog} updateLikes={updateLikes} onDelete={onDelete} currentUserId='1' />
        )
        // Verifica que el botón para mostrar detalles está presente y hace clic en él
        const user = userEvent.setup()
        const detailsButton = screen.getByText('view')
        await user.click(detailsButton)

        // Verifica que la URL del blog y el número de likes se muestran
        const blogUrl = await screen.findByText(blog.url)
        const blogLikes = await screen.findByText(`likes: ${blog.likes}`)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(blogUrl).toBeInTheDocument()
        expect(blogLikes).toBeInTheDocument()
        expect(updateLikes).toHaveBeenCalledTimes(2)

        expect(detailsButton).toHaveTextContent('hide')
        await user.click(detailsButton)

        // Espera a que el DOM se actualice antes de realizar las aserciones
        await waitFor(() => {
            expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
            expect(screen.queryByText(`likes: ${blog.likes}`)).not.toBeInTheDocument()
        })

        expect(detailsButton).toHaveTextContent('view')
    });

});