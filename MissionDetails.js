function Field({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted">{label}</dt>
      <dd className="mt-1 text-base md:text-xl font-semibold text-white">{value}</dd>
    </div>
  );
}

export default function MissionDetails({ launch }) {
  const rocket =
    launch?.rocket?.configuration?.full_name || launch?.rocket?.configuration?.name;
  const provider = launch?.launch_service_provider?.name;
  const pad = launch?.pad?.name;
  const location = launch?.pad?.location?.name;
  const orbit = launch?.mission?.orbit?.name;
  const missionType = launch?.mission?.type;
  const description = launch?.mission?.description;

  return (
    <div className="w-full max-w-5xl border-t border-hairline pt-5 md:pt-6">
      <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-sky mb-4">
        Mission Details
      </p>
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 md:gap-y-5">
        <Field label="Provider" value={provider} />
        <Field label="Rocket" value={rocket} />
        <Field label="Launch Pad" value={pad} />
        <Field label="Location" value={location} />
        <Field label="Orbit" value={orbit} />
        <Field label="Mission Type" value={missionType} />
      </dl>
      {description && (
        <p className="mt-5 text-sm md:text-lg leading-relaxed text-white/80 max-w-4xl line-clamp-4">
          {description}
        </p>
      )}
    </div>
  );
}
