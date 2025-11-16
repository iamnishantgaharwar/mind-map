"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Home() {
  return (
    <>
      <div className=" min-h-screen w-full bg-[#f9fafb] relative">
        {/* Diagonal Fade Grid Background - Top Left */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          }}
        />


        <div className="z-20 relative flex gap-4 flex-col justify-center items-center h-screen">
          <motion.div 
            className="text-center h-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.svg
              className="w-11/12 inline-flex justify-center"
              width="749"
              viewBox="0 0 749 202"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial="hidden"
              animate="visible"
            >
              <motion.path
                d="M705.398 201.28C677.031 201.28 662.847 183.388 662.847 152.078V140.896H690.164V154.315C690.164 168.292 695.942 173.324 705.136 173.324C714.329 173.324 720.107 168.292 720.107 153.756C720.107 137.541 714.329 127.198 695.417 109.586C671.252 86.9418 663.372 71.0071 663.372 48.6427C663.372 17.8916 678.344 3.05176e-05 706.449 3.05176e-05C734.554 3.05176e-05 748.475 17.8916 748.475 49.2018V57.3089H721.158V47.2449C721.158 33.2671 715.905 27.9556 706.712 27.9556C697.518 27.9556 692.265 33.2671 692.265 46.6858C692.265 60.9431 698.306 71.2867 717.218 88.8987C741.383 111.543 749 127.198 749 151.519C749 183.388 733.766 201.28 705.398 201.28Z"
                fill="black"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
              />
              <motion.path
                d="M578.625 198.484V2.79559H621.176C650.069 2.79559 664.253 19.8485 664.253 51.1587V70.448C664.253 101.758 650.069 118.811 621.176 118.811H607.518V198.484H578.625ZM607.518 90.8556H621.176C630.37 90.8556 635.36 86.3827 635.36 72.4049V49.2018C635.36 35.224 630.37 30.7512 621.176 30.7512H607.518V90.8556Z"
                fill="black"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
              />
              <motion.path
                d="M478.717 198.484L508.661 2.79559H547.797L577.741 198.484H548.848L543.595 159.626V160.185H510.762L505.509 198.484H478.717ZM514.176 133.628H540.18L527.31 36.9014H526.784L514.176 133.628Z"
                fill="black"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M358.133 198.484V2.79559H399.371L417.757 142.853H418.282L436.669 2.79559H477.907V198.484H450.59V50.32H450.064L429.052 198.484H404.887L383.874 50.32H383.348V198.484H358.133Z"
                fill="black"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
              />
              <motion.path
                d="M264.56 198.484V2.79559H308.687C337.58 2.79559 351.763 19.8485 351.763 51.1587V150.121C351.763 181.432 337.58 198.484 308.687 198.484H264.56ZM293.452 170.529H308.162C317.355 170.529 322.871 165.497 322.871 151.519V49.7609C322.871 35.7832 317.355 30.7512 308.162 30.7512H293.452V170.529Z"
                fill="black"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
              />
              <motion.path
                d="M165.6 198.484V2.79559H201.847L229.952 119.929H230.477V2.79559H256.218V198.484H226.537L191.866 55.6316H191.341V198.484H165.6Z"
                fill="black"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
              />
              <motion.path
                d="M128.202 198.484V2.79559H157.094V198.484H128.202Z"
                fill="black"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.1, ease: "easeInOut" }}
              />
              <motion.path
                d="M0 198.484V2.79556H41.2379L59.6242 142.853H60.1495L78.5358 2.79556H119.774V198.484H92.4569V50.32H91.9316L70.9186 198.484H46.7538L25.7408 50.32H25.2155V198.484H0Z"
                fill="black"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.div>
          
          <motion.p 
            className="text-muted-foreground text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Structure Your Ideas With Zero Friction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <Link href={"/create-map"}>
              <Button className="inline-flex items-center justify-center cursor-pointer">
                <span>Start Mapping</span> <ArrowUpRight />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Built for Pro Users</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to map your ideas, nothing you don't.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Keyboard shortcuts, instant saves, and zero loading times. Work at the speed of thought.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">
                Generate complex mindmaps with AI. Pre-configured prompts for ChatGPT and other assistants.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Export & Share</h3>
              <p className="text-muted-foreground">
                Export as JSON, share with your team, or import from anywhere. Your data, your way.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Colorful Connections</h3>
              <p className="text-muted-foreground">
                Auto-colored edges, resizable nodes, and a clean interface that stays out of your way.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dark Mode</h3>
              <p className="text-muted-foreground">
                Beautiful dark theme for late-night sessions. Easy on the eyes, easy on the mind.
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                Everything saves locally in your browser. No accounts, no tracking, no cloud required.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-[#f9fafb] py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Map Your Ideas?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Start creating mindmaps in seconds. No signup required.
          </p>
          <Link href={"/create-map"}>
            <Button size="lg" className="inline-flex items-center justify-center cursor-pointer">
              <span>Try It Now</span> <ArrowUpRight />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <svg
                className="w-32 mb-4"
                viewBox="0 0 749 202"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M705.398 201.28C677.031 201.28 662.847 183.388 662.847 152.078V140.896H690.164V154.315C690.164 168.292 695.942 173.324 705.136 173.324C714.329 173.324 720.107 168.292 720.107 153.756C720.107 137.541 714.329 127.198 695.417 109.586C671.252 86.9418 663.372 71.0071 663.372 48.6427C663.372 17.8916 678.344 3.05176e-05 706.449 3.05176e-05C734.554 3.05176e-05 748.475 17.8916 748.475 49.2018V57.3089H721.158V47.2449C721.158 33.2671 715.905 27.9556 706.712 27.9556C697.518 27.9556 692.265 33.2671 692.265 46.6858C692.265 60.9431 698.306 71.2867 717.218 88.8987C741.383 111.543 749 127.198 749 151.519C749 183.388 733.766 201.28 705.398 201.28Z"
                  fill="black"
                />
                <path
                  d="M578.625 198.484V2.79559H621.176C650.069 2.79559 664.253 19.8485 664.253 51.1587V70.448C664.253 101.758 650.069 118.811 621.176 118.811H607.518V198.484H578.625ZM607.518 90.8556H621.176C630.37 90.8556 635.36 86.3827 635.36 72.4049V49.2018C635.36 35.224 630.37 30.7512 621.176 30.7512H607.518V90.8556Z"
                  fill="black"
                />
                <path
                  d="M478.717 198.484L508.661 2.79559H547.797L577.741 198.484H548.848L543.595 159.626V160.185H510.762L505.509 198.484H478.717ZM514.176 133.628H540.18L527.31 36.9014H526.784L514.176 133.628Z"
                  fill="black"
                />
                <path
                  d="M358.133 198.484V2.79559H399.371L417.757 142.853H418.282L436.669 2.79559H477.907V198.484H450.59V50.32H450.064L429.052 198.484H404.887L383.874 50.32H383.348V198.484H358.133Z"
                  fill="black"
                />
                <path
                  d="M264.56 198.484V2.79559H308.687C337.58 2.79559 351.763 19.8485 351.763 51.1587V150.121C351.763 181.432 337.58 198.484 308.687 198.484H264.56ZM293.452 170.529H308.162C317.355 170.529 322.871 165.497 322.871 151.519V49.7609C322.871 35.7832 317.355 30.7512 308.162 30.7512H293.452V170.529Z"
                  fill="black"
                />
                <path
                  d="M165.6 198.484V2.79559H201.847L229.952 119.929H230.477V2.79559H256.218V198.484H226.537L191.866 55.6316H191.341V198.484H165.6Z"
                  fill="black"
                />
                <path
                  d="M128.202 198.484V2.79559H157.094V198.484H128.202Z"
                  fill="black"
                />
                <path
                  d="M0 198.484V2.79556H41.2379L59.6242 142.853H60.1495L78.5358 2.79556H119.774V198.484H92.4569V50.32H91.9316L70.9186 198.484H46.7538L25.7408 50.32H25.2155V198.484H0Z"
                  fill="black"
                />
              </svg>
              <p className="text-sm text-muted-foreground">
                Structure your ideas with zero friction.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/create-map" className="hover:text-foreground transition-colors">
                    Create Mindmap
                  </Link>
                </li>
                <li>
                  <a href="https://github.com/iamnishantgaharwar/mind-map" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://github.com/iamnishantgaharwar" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.nishantgaharwar.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    Website
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nishant Gaharwar. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ for pro users
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
