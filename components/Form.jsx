import Link from "next/link"


const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>
      <p className="desc text-left">
        {type} y compartí prompts geniales con el mundo, y permite a tu imaginación aprovechar cualquier plataforma potenciada por IA
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tu Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Escribe tu prompt aqui..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Etiqueta
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-orange-500 rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form