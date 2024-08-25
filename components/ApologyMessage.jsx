export default function MyMessage() {
    return (
        <main className="text-md text-black flex flex-col gap-8 my-[50px]">
            <p className="italic font-bold">TL;DR: Join the waitlist so you don't miss the launch!</p>
            <p className="text-2xl">👋🏼,</p>
            <p>Hey, thanks for making time for Hacksbazaar's first launch. I'm so grateful for this gesture. Seriously.</p>
            <p>First of all, we want to apologize for not delivering on our word to release Hacksbazaar today due to life<span className="italic"> life-ing</span>.</p>
            <p>Hacksbazaar will be released probably <span className="font-bold italic">before 1st September, 2024.</span></p>
            <p className="text-black">Join the waitlist so you don't miss a thing!</p>

            <div id="mc_embed_shell">
                <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css" />
                <div id="mc_embed_signup">
                    <form action="https://gmail.us14.list-manage.com/subscribe/post?u=313a2d0aa2d92470fdd447f59&amp;id=d27ba57b02&amp;f_id=0091c2e1f0" 
                          method="post" 
                          id="mc-embedded-subscribe-form" 
                          name="mc-embedded-subscribe-form" 
                          className="validate" 
                          target="_blank">
                        <div id="mc_embed_signup_scroll">
                            <h2 className="text-xl font-bold mb-4">join the waitlist</h2>
                            <div className="indicates-required text-sm mb-2">
                                <span className="asterisk">*</span> indicates required
                            </div>
                            <div className="mc-field-group mb-4">
                                <label htmlFor="mce-EMAIL" className="block mb-2">Email Address <span className="asterisk">*</span></label>
                                <input type="email" name="EMAIL" className="required email w-full p-2 border rounded-md" id="mce-EMAIL" required />
                            </div>
                            <div id="mce-responses" className="clear foot">
                                <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                                <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
                            </div>
                            <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                                {/* Prevent bot signups */}
                                <input type="text" name="b_313a2d0aa2d92470fdd447f59_d27ba57b02" tabIndex="-1" value="" />
                            </div>
                            <div className="optionalParent">
                                <div className="clear foot">
                                    <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button bg-blue-500 text-white font-bold py-2 px-4 rounded-md" value="join the list!" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
