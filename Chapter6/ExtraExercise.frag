#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
#define PI 3.14159265359

vec3 colorA = vec3(1.0, 0.0, 0.0);
vec3 colorB = vec3(0.0, 1.0, 0.0);
vec3 colorC = vec3(0.0, 0.0, 1.0);

vec3 colorD = vec3(1.0, 1.0, 0.0);
vec3 colorE = vec3(0.0, 1.0, 1.0);
vec3 colorF = vec3(1.0, 0.0, 1.0);

vec3 colorG = vec3(1.0, 1.0, 1.0);

vec3 SimpleFlag(float step1, float step2, vec3 color, vec2 st)
{
    color = mix(colorA, colorB, step(step1,st.y));
    color = mix(color, colorC, step(step2,st.y));
    return color;
}

float plot2 (vec2 st, float pct)
{
    float lineWidth = 0.02;
    return smoothstep(pct-lineWidth, pct, st.y) -
        smoothstep(pct, pct+lineWidth, st.y);
}

vec3 SimpleRainbow(vec3 color,float x, float y)
{
    float anim = 0.1 * (sin(x * PI) * 0.5 + 0.5);
    anim = 0.12 * (sin(u_time * x * 0.1) * 0.5 + 0.5);
    anim = 0.12 * (sin(u_time + x) * 0.5 + 0.5);
    anim = 0.1 * (sin(u_time + x * 10.) * 0.5 + 0.5);
    


    float step1 = 0.1428 + anim;
    float step2 = 0.2857 + anim;
    float step3 = 0.4285 + anim;
    float step4 = 0.5714 + anim;
    float step5 = 0.7142 + anim;
    float step6 = 0.8571 + anim;

    color = mix(colorA, colorB, step(step1, y));
    color = mix(color, colorC, step(step2, y));
    color = mix(color, colorD, step(step3, y));
    color = mix(color, colorE, step(step4, y));
    color = mix(color, colorF, step(step5, y));
    color = mix(color, colorG, step(step6, y));


    return color;
}


void main()
{
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec3 pct = vec3(st.y);

    color = SimpleFlag(0.333, 0.666, color, st);
    
    color = SimpleRainbow(color, st.x, st.y);
    gl_FragColor = vec4(color, 1.0);
}