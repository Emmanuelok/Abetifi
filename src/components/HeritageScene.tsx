import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type HeritageSceneProps = {
  motionEnabled: boolean
}

const seeded = (index: number, seed = 12.9898) => {
  const value = Math.sin(index * seed) * 43758.5453
  return value - Math.floor(value)
}

export function HeritageScene({ motionEnabled }: HeritageSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x090b08, 0.13)

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 80)
    camera.position.set(0, 0.05, 8.5)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.9

    const world = new THREE.Group()
    world.position.set(1.5, 0, 0)
    scene.add(world)

    const strata = new THREE.Group()
    world.add(strata)

    for (let layer = 0; layer < 13; layer += 1) {
      const points: THREE.Vector3[] = []
      const count = 160
      const depth = -layer * 0.48
      const radius = 2.3 + layer * 0.07
      for (let i = 0; i < count; i += 1) {
        const angle = (i / count) * Math.PI * 2
        const roughness =
          Math.sin(angle * 3 + layer * 0.82) * 0.08 +
          Math.sin(angle * 7 - layer * 0.43) * 0.035 +
          Math.sin(angle * 13 + layer) * 0.016
        const x = Math.cos(angle) * (radius + roughness) * 1.32
        const y = Math.sin(angle) * (radius + roughness) * 0.79
        points.push(new THREE.Vector3(x, y, depth))
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: layer % 3 === 0 ? 0xd9ae75 : 0x586458,
        transparent: true,
        opacity: Math.max(0.08, 0.42 - layer * 0.025),
      })
      const line = new THREE.LineLoop(geometry, material)
      line.rotation.z = (layer - 6) * 0.01
      strata.add(line)
    }

    const stoneGeometry = new THREE.IcosahedronGeometry(0.13, 0)
    const stoneMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xd7c5a1, roughness: 0.62, metalness: 0.05 }),
      new THREE.MeshStandardMaterial({ color: 0x8e755d, roughness: 0.95 }),
      new THREE.MeshStandardMaterial({ color: 0x4f5b4d, roughness: 1 }),
    ]

    const fragments = new THREE.Group()
    for (let i = 0; i < 82; i += 1) {
      const angle = seeded(i, 8.12) * Math.PI * 2
      const radial = 1.15 + seeded(i, 4.7) * 2.25
      const fragment = new THREE.Mesh(stoneGeometry, stoneMaterials[i % stoneMaterials.length])
      fragment.position.set(
        Math.cos(angle) * radial * 1.2,
        Math.sin(angle) * radial * 0.76,
        -seeded(i, 2.31) * 5.4,
      )
      const scale = 0.45 + seeded(i, 6.33) * 1.9
      fragment.scale.set(scale * 0.62, scale * 1.45, scale * 0.5)
      fragment.rotation.set(seeded(i, 3.91) * Math.PI, seeded(i, 9.19) * Math.PI, angle)
      fragments.add(fragment)
    }
    world.add(fragments)

    const portalMaterial = new THREE.MeshStandardMaterial({
      color: 0x141b15,
      emissive: 0x4a2d16,
      emissiveIntensity: 0.18,
      roughness: 0.9,
      side: THREE.BackSide,
    })
    const portal = new THREE.Mesh(new THREE.SphereGeometry(4.2, 48, 32), portalMaterial)
    portal.scale.set(1.25, 0.78, 1.4)
    portal.position.z = -4.4
    world.add(portal)

    const dustGeometry = new THREE.BufferGeometry()
    const dustCount = 520
    const dustPositions = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i += 1) {
      dustPositions[i * 3] = (seeded(i, 3.11) - 0.5) * 9
      dustPositions[i * 3 + 1] = (seeded(i, 7.77) - 0.5) * 5.5
      dustPositions[i * 3 + 2] = -seeded(i, 2.93) * 10 + 2
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        color: 0xdcc7a1,
        size: 0.018,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      }),
    )
    world.add(dust)

    scene.add(new THREE.AmbientLight(0xb6b49e, 0.72))
    const key = new THREE.PointLight(0xe7ad65, 16, 16, 2)
    key.position.set(1.8, 0.6, 3.5)
    scene.add(key)
    const rim = new THREE.PointLight(0x6d8f79, 10, 14, 2)
    rim.position.set(-2.4, -0.8, 0)
    scene.add(rim)

    const pointer = { x: 0, y: 0 }
    let scrollProgress = 0
    let animationFrame = 0
    const clock = new THREE.Clock()

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      if (!clientWidth || !clientHeight) return
      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2
    }

    const onScroll = () => {
      const range = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      scrollProgress = window.scrollY / range
    }

    const render = () => {
      const elapsed = clock.getElapsedTime()
      if (motionEnabled) {
        world.rotation.y += (pointer.x * 0.08 - world.rotation.y) * 0.025
        world.rotation.x += (-pointer.y * 0.045 - world.rotation.x) * 0.025
        strata.rotation.z = elapsed * 0.008 - scrollProgress * 0.16
        fragments.rotation.z = -elapsed * 0.004 + scrollProgress * 0.1
        dust.rotation.y = elapsed * 0.008
        camera.position.z = 8.5 - Math.min(scrollProgress * 2.4, 2.4)
        key.position.x = 1.8 + Math.sin(elapsed * 0.32) * 0.45
      }
      camera.lookAt(world.position.x * 0.42, 0, -1.5)
      renderer.render(scene, camera)
      animationFrame = window.requestAnimationFrame(render)
    }

    resize()
    onScroll()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    render()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      renderer.dispose()
    }
  }, [motionEnabled])

  return <canvas ref={canvasRef} className="heritage-scene" aria-hidden="true" />
}
