import datetime
import re
from pathlib import Path

def _sanitize_component(value: str) -> str:
    """Sanitize a string component to be filesystem‑safe.
    - Lower‑case
    - Replace spaces with underscores
    - Remove characters other than alphanumerics, dash, underscore
    """
    value = value.lower().replace(" ", "_")
    # Keep only alphanum, dash, underscore
    return re.sub(r"[^a-z0-9_-]", "", value)

def generate_result_name(
    user_id: str,
    document_id: str,
    result_type: str,
    extension: str = "json",
    base_dir: Path | str = "results",
) -> Path:
    """Generate a deterministic, readable filename for analysis results.

    Parameters
    ----------
    user_id: str
        Identifier of the user (or organization) that triggered the analysis.
    document_id: str
        Unique identifier of the uploaded document (e.g. UUID or DB primary key).
    result_type: str
        Type of result – e.g. "heatmap", "verdict", "metadata".
    extension: str, optional
        File extension, default ``json``. Use ``png`` for image outputs.
    base_dir: Path | str, optional
        Root directory where results are stored. Defaults to ``results``
        relative to the project root.

    Returns
    -------
    Path
        Full path to the result file, e.g.
        ``results/<user>/<doc>/20251230T153500Z_heatmap.json``
    """
    timestamp = datetime.datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    safe_user = _sanitize_component(user_id)
    safe_doc = _sanitize_component(document_id)
    safe_type = _sanitize_component(result_type)
    filename = f"{timestamp}_{safe_type}.{extension}"
    return Path(base_dir) / safe_user / safe_doc / filename

# Example usage (can be removed in production)
if __name__ == "__main__":
    print(generate_result_name("User123", "doc-456", "Heatmap", "png"))
