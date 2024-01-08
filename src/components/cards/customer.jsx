import React from 'react'

const customer = () => {
    return (
        <>
            <div className="block w-[350px] rounded-lg bg-white shadow-lg dark:bg-[#88211A] dark:shadow-black/30">
                <div className="h-28 overflow-hidden rounded-t-lg bg-[#b08a4c]"></div>
                <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                    <img src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" />
                </div>
                <div className="p-6">
                    <h4 className="mb-4 text-2xl font-semibold text-white">Maria Smantha</h4>
                    <hr />
                    <p className="mt-4 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="inline-block h-7 w-7 pr-2"
                            viewBox="0 0 24 24">
                            <path
                                d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                        </svg>
                        Lorem ipsum dolor sit amet eos adipisci, consectetur
                        adipisicing elit.
                    </p>
                </div>
            </div>
        </>
    )
}

export default customer