uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;
attribute float aScale;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.y += 0.5 + sin(0.5 * uTime + 100.0 * modelPosition.x) * aScale * 0.2;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  gl_PointSize = uSize * aScale * uPixelRatio;
  gl_PointSize *= (1.0 / - viewPosition.z);
}